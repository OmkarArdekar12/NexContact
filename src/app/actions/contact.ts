"use server";
import { revalidatePath } from "next/cache";
import { createContact, deleteContact, updateContact } from "../api/contact";
import { getSession } from "../_lib/session";
import { ContactType } from "../_types/contact";

export const createContactAction = async (
  prevState: any,
  formData: FormData
) => {
  if (!formData) {
    return { error: `Form data is missing` };
  }
  if (!formData.get("name")) {
    return { error: `Name is missing` };
  }
  if (!formData.get("email")) {
    return { error: `Email is missing` };
  }

  const user = await getSession();

  const newContact: ContactType = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    userId: user?.id,
  };

  try {
    await createContact(newContact);
    revalidatePath("/contact");
    return { success: true };
  } catch (err) {
    console.log("Error creating contact: ", err);
    return { error: "Failed to create contact" };
  }
};

export const updateContactAction = async (
  prevState: any,
  formData: FormData
) => {
  const id: string = formData.get("id") as string;
  const user = await getSession();

  const updatedContact: ContactType = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    userId: user?.id,
  };

  try {
    await updateContact(id, updatedContact);
    revalidatePath("/contact");
    return { success: true };
  } catch (err) {
    console.log("Error updating contact: ", err);
    return { error: "Failed to update contact" };
  }
};

export const deleteContactAction = async (
  prevState: any,
  formData: FormData
) => {
  const id = formData.get("id") as string;
  try {
    await deleteContact(id);
    revalidatePath("/contact");
    return { success: true };
  } catch (err) {
    console.log("Error deleting contact: ", err);
    return { error: "Failed to delete contact" };
  }
};
