"use client";

import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  title: string;
  companyName: string;
  salary: string;
  location: string;
  description: string;
};
import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function page() {
  const [jobCreated, setjobCreated] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await axios.post("/api/job", data);

    if (response.status == 200) {
      setjobCreated(true);
      router.push("/job/" + response.data.data._id);
    }
  };

  return (
    <div className="flex flex-col bg-black text-white min-h-screen p-8">
      <Modal isOpen={jobCreated} onClose={() => setjobCreated(false)}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Congratulations!
              </ModalHeader>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-semibold ">Post a Job</h1>
        <p className="text-lg font-medium">
          Here a recruiter can post a job for the applicant to see and apply.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 max-w-screen-md"
        >
          <Input
            type="text"
            placeholder="Job Title"
            size="sm"
            {...register("title", { required: true, minLength: 2 })}
          />
          {errors.title && (
            <span className="text-red-400">This field is required</span>
          )}
          <Input
            type="text"
            placeholder="Company Name"
            size="sm"
            {...register("companyName", {
              required: true,
              minLength: 2,
            })}
          />
          {errors.companyName && (
            <span className="text-red-400">This field is required</span>
          )}
          <Textarea
            placeholder="Description"
            size="sm"
            {...register("description", {
              required: true,
              minLength: 2,
            })}
          />
          {errors.description && (
            <span className="text-red-400">This field is required</span>
          )}
          <Input
            type="text"
            placeholder="Location"
            size="sm"
            {...register("location", {
              required: true,
              minLength: 2,
            })}
          />
          {errors.location && (
            <span className="text-red-400">This field is required</span>
          )}
          <Input
            type="text"
            placeholder="Salary"
            size="sm"
            {...register("salary", {
              required: true,
              minLength: 2,
            })}
          />
          {errors.salary && (
            <span className="text-red-400">This field is required</span>
          )}
          <Button color="success" onClick={handleSubmit(onSubmit)}>
            Post Job
          </Button>
        </form>
      </div>
    </div>
  );
}
