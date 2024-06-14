import React from 'react';
import {
  Stack,
  Pagination,
  Card,
  CardActionArea,
  CardHeader,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import axios from 'axios';
import { Business, LocationOn, AttachMoney, Event } from '@mui/icons-material';
import { useQuery } from 'react-query';

const fetchJobs = async (pageNo = 0, pageSize = 10, sortBy = 'id') => {
  const res = await axios.get(
    `${
      import.meta.env.VITE_API_URL
    }/api/jobs?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}`
  );
  console.log(res.data);
  return res.data;
};

const JobPosting = () => {
  const [page, setPage] = React.useState(0);
  const { isLoading, error, data } = useQuery(
    ['jobs', page],
    () => fetchJobs(page),
    {
      keepPreviousData: true,
    }
  );

  if (isLoading) return 'Loading...';
  if (error) return `An error has occurred: ${error.message}`;
  return (
    <Stack width={'100%'} paddingY={2}>
      {data &&
        data.map((item, index) => (
          <>
            <Card sx={{ marginBottom: 1 }}>
              <CardActionArea key={index}>
                <CardHeader title={item.title} />
                <CardContent>
                  <Stack direction="row" justifyContent={'space-between'}>
                    <Stack alignItems="center" direction="row" gap={1}>
                      <Business />
                      <Typography variant="body1" color="text.secondary">
                        {item.company}
                      </Typography>
                    </Stack>
                    <Stack alignItems="center" direction="row" gap={1}>
                      <LocationOn />
                      <Typography variant="body2" color="text.secondary">
                        {item.location}
                      </Typography>
                    </Stack>
                    <Stack alignItems="center" direction="row" gap={1}>
                      <AttachMoney />
                      <Typography variant="body2" color="text.secondary">
                        {item.salary}
                      </Typography>
                    </Stack>

                    <Stack alignItems="center" direction="row" gap={1}>
                      <Event />
                      <Typography variant="body2" color="text.secondary">
                        {item.deadlineSubmit}
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
            <Stack direction={'row'} justifyContent="flex-end" marginTop={1}>
              <Pagination
                count={data.totalPages}
                variant="outlined"
                page={page + 1}
                onChange={(event, value) => setPage(value - 1)}
              />
            </Stack>
          </>
        ))}
    </Stack>
  );
};

export default JobPosting;
