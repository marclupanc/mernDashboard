import { useEffect, useState } from "react";
import { useGetIdentity, useShow } from "@pankod/refine-core";
import { FieldValues, useForm } from "@pankod/refine-react-hook-form";
import Form from "components/common/Form";

const EditProperty = () => {
  const { data: user } = useGetIdentity();
  const { queryResult } = useShow();
  const { data } = queryResult;
  const previousImage = data?.data?.photo;
  const [propertyImage, setPropertyImage] = useState({
    name: "",
    url: "",
  });
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
  } = useForm();

  const handleImageChange = (file: File) => {
    const reader = (readFile: File) =>
      new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.readAsDataURL(readFile);
      });

    reader(file).then((result: string) =>
      setPropertyImage({ name: file?.name, url: result })
    );
  };

  const onFinishHandler = async (data: FieldValues) => {
    if (!propertyImage.name && !previousImage)
      return alert("Please upload a property image");

    await onFinish({
      ...data,
      photo: previousImage ? previousImage : propertyImage.url,
      email: user.email,
    });
  };

  return (
    <Form
      type="Edit"
      register={register}
      onFinish={onFinish}
      formLoading={formLoading}
      handleSubmit={handleSubmit}
      handleImageChange={handleImageChange}
      onFinishHandler={onFinishHandler}
      propertyImage={propertyImage}
    />
  );
};

export default EditProperty;
