"use client";

import { createClient } from '@/lib/supabase/browserClient';
import { useQuery } from '@tanstack/react-query';
import React from 'react'

export default function Student() {
  const supabase = createClient();

  const { data: Student = [] } = useQuery({
    queryKey: ["Student"],
    queryFn: async () => {
      const res = await supabase.from("Student").select("*");

      return res.data;
    }
  })
  const { data: Teacher = [] } = useQuery({
    queryKey: ["Teacher"],
    queryFn: async () => {
      const res = await supabase.from("Teacher").select("*");

      return res.data;
    }
  })

  console.log(Student, Teacher);

  const deleteTeacher = async (TeacherId: string) => {
    await supabase.from("Teacher").delete().eq("id", TeacherId);
  }

  const createUser = async () => {
    await supabase.from("Teacher").insert({
      full_name: "Наполеон Вадим Александрович",
    });
  }

  return (
    <div>
      <div>
        Список студентов:
        {Student.map((Student) => (<div key={Student.id}>{Student.full_name}</div>))}
      </div>
      <div>
        Список учителей:
        {Teacher.map((Teacher) => (<div><div>{Teacher.full_name}</div><button className='bg-red-500 cursor-pointer' onClick={() => deleteTeacher(Teacher.id)}>Удалить</button></div>))}
      </div>
      <div>
        <input type='text' className='border border-black' />
        <button className='bg-green-500 cursor-pointer' onClick={() => createUser()}>Добавить пользователя</button>
      </div>
    </div>
  )
}

