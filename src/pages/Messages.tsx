import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import InputBar from "../Components/InputBar";
import Message, { IMessage } from "../Components/Message";
import { IResponse } from "../interfaces/IReponse";
import { browser, loaderBox, _messages } from "../styles/_Messages.module.scss";
import SocketIO, { Socket } from "socket.io-client";
import LoadingBar from "../Components/LoadingBar";
import { ILoadingBarProps } from "../Components/LoadingBar";

function Messages() {
  const [cookies, setCookies, delCookie] = useCookies();

  const [inputval, setInputval] = useState("");
  const [io, setIo] = useState<Socket>();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [message, setMessage] = useState<ILoadingBarProps>({ text: "" });

  const navigate = useNavigate();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current.scrollIntoView();
    // Scroll to bottom
    // { behavior: "smooth" }, when spam, doesn't scroll
  }, [messages]);

  useEffect(() => {
    // Verify if session valid

    if (cookies.auth == null) navigate("/login");
    const io = SocketIO(`${import.meta.env.VITE_SERVER_URL}`, {
      timeout: 30000,
    });

    setIo(io);
    if (cookies.auth == null) return;

    setMessage((prev) => ({
      ...prev,
      color: undefined,
      text: "Connecting to server",
      showSpinner: true,
    }));

    setTimeout(() => {
      if (!io.connected)
        setMessage((prev) => ({
          ...prev,
          color: undefined,
          text: "Starting server",
          showSpinner: true,
        }));
    }, 1000);

    axios({
      url: `${import.meta.env.VITE_SERVER_URL}/api/verify?auth=${cookies.auth}`,
      method: "GET",
    }).then((e) => {
      const data: IResponse = e.data;

      if (!data.success) {
        delCookie("auth");
        navigate("/login");
      }
    });

    io.on("connect", () => {
      setMessage((prev) => ({
        ...prev,
        text: "Connected",
        color: "#0d9900",
        showSpinner: false,
      }));

      setTimeout(() => setMessage((prev) => ({ ...prev, text: "" })), 1000);
    });

    io.on("connect_error", () => {
      setMessage((prev) => ({
        ...prev,
        text: "Failed to connect",
        color: undefined,
        showSpinner: false,
      }));
    });

    io.on("new:message", (message: IMessage) => {
      setMessages((prev) => [...prev, message]);
    });

    io.emit("login", cookies.auth);
  }, []);

  function sendMessage(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key != "Enter" || inputval.length < 1) return;

    setInputval("");
    io.emit("send:message", inputval);
  }

  return (
    <div className={_messages}>
      <div className={browser}>
        {messages.map((m, index) => (
          <Message key={index} {...m} />
        ))}
        <div ref={bottomRef}></div>
      </div>

      <InputBar val={inputval} keyUp={sendMessage} setValue={setInputval}>
        {message.text !== "" && (
          <LoadingBar
            classes={`${loaderBox}`}
            color={message.color}
            showSpinner={message.showSpinner}
            text={message.text}
          />
        )}
      </InputBar>
    </div>
  );
}

export default Messages;
