import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography} from "@mui/material";
import axios from "axios";

const TicketInfo = () => {
  const { query_key } = useParams();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/info/${query_key}`);
        setTicket(response.data);
      } catch (error) {
        console.error("Error fetching ticket details:", error);
      }
    };

    fetchTicket();
  },[query_key]);

  if (!ticket) {
    return (
      <Container>
        <Typography variant="h6">Loading...</Typography>
      </Container>
    );
  }

  return (
    <div>
      <div class="row-mt-2">
        <h3>TICKET INFO</h3>
      </div>
      <div class="row-mt-4">
        <strong>ticket ID:</strong> {ticket.ticket_id}
      </div>
      <div class="row-mt-4">
        <p><strong>Route:</strong> {ticket.from} heading to {ticket.to}</p>
      </div>
      <div class="row-mt-4">
        <p><strong>Customer Name:</strong> {ticket.customer_name}</p>
      </div>
      <div class="row-mt-4">
        <p><strong>Price:</strong> {ticket.price} {ticket.currency}</p>
      </div>
      <div class="row-mt-4">
        <p><strong>Departure Time:</strong> {ticket.departure_time} {ticket.departure_date}</p>
      </div>
    </div>
  );
};

export default TicketInfo;
