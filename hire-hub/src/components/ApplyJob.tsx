"use client";

type Inputs = {
  fullName: string;
  mobileNumber: string;
  email: string;
  location: string;
  resumeLink: string;
};

import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

export default function ApplyJob({ jobId }: { jobId: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const session = useSession();
  const { data: sessionData } = session;

  const router = useRouter();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await axios.post("/api/job/apply", {
      ...data,
      jobId: jobId,
      applicantUserId: sessionData?.user._id,
    });

    if (response.status == 200) {
      alert("You have successfully applied for this job");
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 max-w-screen-md"
      >
        <Input
          type="text"
          placeholder="Full name"
          size="sm"
          {...register("fullName", { required: true, minLength: 2 })}
        />
        {errors.fullName && (
          <span className="text-red-400">This field is required</span>
        )}
        <Input
          type="text"
          placeholder="Mobile Number"
          size="sm"
          {...register("mobileNumber", {
            required: true,
            minLength: 2,
          })}
        />
        {errors.mobileNumber && (
          <span className="text-red-400">This field is required</span>
        )}

        <Input
          type="email"
          placeholder="Email"
          size="sm"
          {...register("email", {
            required: true,
            minLength: 2,
          })}
        />
        {errors.email && (
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
          type="url"
          placeholder="Resume Link"
          size="sm"
          {...register("resumeLink", {
            required: true,
            minLength: 2,
          })}
        />
        {errors.resumeLink && (
          <span className="text-red-400">This field is required</span>
        )}
        <Button color="success" onClick={handleSubmit(onSubmit)}>
          Apply
        </Button>
      </form>
    </div>
  );
}
