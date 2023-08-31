import { UpdateForm } from "@/app/components/UpdateForm";
import React from "react";

const UpdatePage = ({ params }: { params: { id: string } }) => {
  return <UpdateForm params={params} />;
};

export default UpdatePage;
