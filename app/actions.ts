'use server'

import { revalidatePath } from "next/cache";

export default async function createDocument (formData : FormData) {
    const title = formData.get('title')
    const content = formData.get('content')

    console.log('title content', title, content);
    revalidatePath('/dashboard');
}