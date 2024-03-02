"use client";
import styles from "../../../style/job-post.module.css";
import { useForm, SubmitHandler } from "react-hook-form";

import Link from "next/link";


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
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export default function page() {
  const [jobCreated, setjobCreated] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();

  const session = useSession();
  const { data: sessionData } = session;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await axios.post("/api/job", {
      ...data,
      postedBy: sessionData?.user?._id,
    });

    if (response.status == 200) {
      setjobCreated(true);
      router.push("/job/" + response.data.data._id);
    }
  };

  return (
    <>
    <div className="bg-gray-900">
    <div className="container mx-auto px-10">
      <nav className="flex items-center justify-between py-4">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <button className="search-button">
            <div className="hoverEffect">
              <Link href="/search">Search</Link>
              <div></div>
            </div>
          </button>
          <span className="w-5font-semibold text-xl tracking-tight">
            &nbsp;&nbsp;&nbsp;<Link href="/">Jobify</Link>
          </span>
        </div>

        <div className="hidden  md:flex md:items-center md:ml-auto md:mr--10 ">
          <p className="text-gray-300 hover:text-white px-4">
            <Link href="/">Home</Link>
          </p>
          <p className="text-gray-300 hover:text-white px-4">About</p>
          <p className="text-gray-300 hover:text-white px-4">Services</p>
          <p className="text-gray-300 hover:text-white px-4">Contact</p>

          {session ? (
            <button
              className="button1"
              onClick={() => {
                signOut();
              }}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Sign Out
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </button>
          ) : (
            <>
              <button className="button1">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Link href="/login">Sign In</Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </button>
              <button className="button2">
                <Link href="/register">Sign Up</Link>
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  </div>
  <div className="h-screen flex flex-col gap-2 justify-center items-center bg-gradient-to-r text-transparent bg-clip-text animate-gradient">

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
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <p className={styles.title}>Post a New JOB! </p>
          <p className={styles.message}>Fill out this form below to continue </p>
          <Input
          className={styles.input}
            type="text"
            placeholder="Job Title"
            size="sm"
            {...register("title", { required: true, minLength: 2 })}
          />
          {errors.title && (
            <span className="text-red-400">This field is required</span>
          )}
          <Input
          className={styles.input}
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
          className={styles.input}
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
          className={styles.input}
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
          className={styles.input}
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
          <Button className={styles.submit} onClick={handleSubmit(onSubmit)}>
            Post Job
          </Button>
        </form>
      </div>


</>
  );
}

