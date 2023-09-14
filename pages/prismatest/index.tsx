import React, { useEffect, useState } from "react";
import axios from "axios";

interface PrismaTestProps {
  id: number;
  name: string;
  email: string;
}

export default function PrismaTest() {
  const [artists, setArtists] = useState<PrismaTestProps[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // 새로운 아티스트 생성
  async function createArtist(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    try {
      const response = await axios.post("/api/prismasql", {
        name: name,
        email: email,
      });

      console.log(response.data); // 생성된 아티스트 정보 출력

      setArtists((prevArtists) => [...prevArtists, response.data]);
    } catch (error) {
      console.error(error);
    }
  }

  // 모든 아티스트 조회
  async function fetchArtists() {
    try {
      const response = await axios.get("/api/prismasql");
      setArtists(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  // useEffect를 이용해 컴포넌트가 마운트될 때 모든 아티스트를 조회
  useEffect(() => {
    fetchArtists();
  }, []);

  return (
    <div>
      <p>이름입력 : </p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-1/2 h-10 border-2 border-gray-700"
      />
      <p>이메일 입력 : </p>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-1/2 h-10 border-2 border-gray-700"
      />
      <button onClick={createArtist}>Create Artist</button>

      <h1>Artist List:</h1>

      {artists.map((artist) => (
        <div key={artist.id}>
          <h2>{artist.name}</h2>
          <p>{artist.email}</p>
          <p>{artist.id}</p>
        </div>
      ))}
    </div>
  );
}
