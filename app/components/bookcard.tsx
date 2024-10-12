import { useRouter } from "next/navigation";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import React from "react";

interface BookCardProps {
  id: number;
  title: string;
  author: string;
}

export default function BookCard({ id, title, author }: BookCardProps) {
  const router = useRouter();

  return (
    <Card
      className="hover:bg-gray-800 bg-gray-900 p-2 m-4 cursor-pointer"
      onClick={() => router.push(`/book/${id}`)}
    >
      <CardHeader className="bg-gray-900" floated={false}>
        <img src="https://placehold.co/250x250" alt="card-image" />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="white" className="mb-2">
          {title}
        </Typography>
        <Typography className="text-gray-500">{author}</Typography>
      </CardBody>
    </Card>
  );
}
