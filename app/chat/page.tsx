"use client";

import React, { useState } from 'react'

import GigaChat from 'gigachat';
import { Agent } from 'node:https';

const httpsAgent = new Agent({
    rejectUnauthorized: false,
});

const client = new GigaChat({
    timeout: 600,
    model: 'GigaChat',
    httpsAgent: httpsAgent,
  dangerouslyAllowBrowser: true,
});

export default function ChatPage() {
  // Вопрос который мы введем в инпуте
  // Хотим ответ от гигачата?
  const [value, setValue] = useState("");
  const [response, setResponse] = useState("");
  const [Name, setName] = useState([]);

  const sendQuestion = async () => {
    setResponse("Загружаю");

    const res = await fetch("http://localhost:3000/api", { method: "POST", body: JSON.stringify({
      message: value,
    })})

    const data = await res.json();
    if (data.type === "func") setName(data.message);
    else setResponse(data.message);
  }

  return (
    <div>
      <div>{Name.map((user) => <div>{user.name}</div>)}</div>
      <div>{response}</div>
      <textarea className='border-black' value={value} onChange={(e) => setValue(e.target.value)} />
      <button className='bg-red-500' type="button" onClick={() => sendQuestion()}>Отправить</button>
    </div>
  )
}