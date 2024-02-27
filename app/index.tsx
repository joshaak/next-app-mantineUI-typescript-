// pages/index.tsx
"use client";
// pages/index.tsx

import { useEffect, useState } from "react";
import axios from "axios";

import {
  Paper,
  Avatar,
  Group,
  Text,
  Button,
  Flex,
  Center,
} from "@mantine/core";
import {
  IconUserPlus,
  IconUserMinus,
  IconStar,
  IconTrash,
  IconAt,
  IconPhoneCall,
  IconWorld,
} from "@tabler/icons-react";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  isFollowed: boolean;
}

const IndexPage: React.FC = () => {
  const generateAvatarKeyUrl = process.env.GENERATE_AVATAR_KEY_URL;
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // const [isClicked, setIsClicked] = useState(false);
  console.log(process.env.API_KEY);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        const fetchedUsers: User[] = response.data
          .slice(0, 10)
          .map((user: User) => ({
            ...user,
            isFollowed: false,
          }));
        setUsers(fetchedUsers);
      } catch (error) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const generateAvatarUrl = (name: string) =>
    `https://api.dicebear.com/7.x/initials/svg?seed=${name}`;

  const handleFollowToggle = (id: number) => {
    // setIsClicked(!isClicked);
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, isFollowed: !user.isFollowed } : user
      )
    );
  };

  const handleDelete = (id: number) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit, minmax(250px,  calc(25% - 30px)))",
        gap: "20px",
        maxWidth: "100%",
        margin: "2% auto auto 4%",
      }}
    >
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {users.map((user) => (
        <Paper
          style={{
            borderRadius: "var(--mantine-radius-md)",
            boxShadow: "var(--mantine-shadow-md)",
            padding: "var(--mantine-spacing-lg)",
            boxSizing: "border-box",
            minWidth: "250px",
            maxWidth: "100%",
          }}
          data-with-border="true"
        >
          <a href={user.website}>
            <Avatar
              src={generateAvatarUrl(user.name)}
              alt={user.name}
              radius="xl"
              style={{
                width: "calc(7.5rem * var(--mantine-scale))",
                height: "calc(7.5rem * var(--mantine-scale))",
                borderRadius: "calc(7.5rem * var(--mantine-scale))",
                marginRight: "auto",
                marginLeft: "auto",
              }}
            />
          </a>

          <Text
            style={{
              marginTop: "var(--mantine-spacing-md)",
              fontSize: "var(--mantine-font-size-lg)",
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            {user.name} {user.isFollowed ? <IconStar /> : ""}
          </Text>
          <Group
            style={{
              "--group-gap": "calc(0.3125rem * var(--mantine-scale))",
              "--group-align": "left",
              "--group-justify": "left",
              "--group-wrap": "wrap",
            }}
          >
            <Text size="sm" color="gray">
              <a
                style={{
                  color: "var(--mantine-color-dimmed)",

                  fontSize: "var(--mantine-font-size-sm)",
                }}
                href={`mailto:${user.email}`}
              >
                <IconAt style={{ width: "1em", height: "0.8em" }} />{" "}
                {user.email}
              </a>
            </Text>
          </Group>
          <Group
            style={{
              "--group-gap": "calc(0.3125rem * var(--mantine-scale))",
              "--group-align": "left",
              "--group-justify": "left",
              "--group-wrap": "wrap",
            }}
          >
            <Text>
              <a
                style={{
                  color: "var(--mantine-color-dimmed)",

                  fontSize: "var(--mantine-font-size-sm)",
                }}
                href={`tel:${user.phone}`}
              >
                <IconPhoneCall style={{ width: "1em", height: "0.8em" }} />
                {user.phone}
              </a>
            </Text>
          </Group>
          <Group
            style={{
              "--group-gap": "calc(0.3125rem * var(--mantine-scale))",
              "--group-align": "left",
              "--group-justify": "left",
              "--group-wrap": "wrap",
            }}
          >
            <Text>
              <a
                style={{
                  color: "var(--mantine-color-dimmed)",

                  fontSize: "var(--mantine-font-size-sm)",
                }}
                href={`tel:${user.phone}`}
              >
                <IconWorld style={{ width: "1em", height: "0.8em" }} />{" "}
                {user.website}
              </a>
            </Text>
          </Group>

          <Group
            style={{
              "--group-gap": "calc(0.9375rem * var(--mantine-scale))",
              "--group-align": "center",
              "--group-justify": "center",
              "--group-wrap": "nowrap",
              width: "100%",
            }}
          >
            <Button
              variant={user.isFollowed ? "default" : "primary"}
              data-variant="primary"
              data-block="true"
              data-with-left-section="true"
              type="button"
              onClick={() => handleFollowToggle(user.id)}
            >
              {user.isFollowed ? (
                <IconUserMinus style={{ width: "1em", height: "0.8em" }} />
              ) : (
                <IconUserPlus
                  style={{ width: "1em", height: "0.8em", margin: "0.1em " }}
                />
              )}
              {user.isFollowed ? "Unfollow" : "Follow"}
            </Button>
            <Button
              variant="outline"
              data-variant="outline"
              data-block="true"
              data-with-left-section="true"
              type="button"
              onClick={() => handleDelete(user.id)}
            >
              <IconTrash style={{ width: "1em", height: "0.8em" }} />
              Delete
            </Button>
          </Group>
        </Paper>
      ))}
    </div>
  );
};

export default IndexPage;
