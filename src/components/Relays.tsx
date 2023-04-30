import { useState } from "react";
import Link from "next/link";

import {
  Flex,
  Stack,
  Text,
  Heading,
  Card,
  CardHeader,
  CardBody,
} from "@chakra-ui/react";
import { nip19 } from "nostr-tools";
import { useAtom } from "jotai";

import { relaysAtom } from "@habla/state";
import useRelayMetadata from "@habla/hooks/useRelayMetadata";
import RelayFavicon from "./RelayFavicon";
import RelaySummary from "./RelaySummary";

function RelayCard({ url }) {
  const { data, isError } = useRelayMetadata(url);
  return (
    <Card variant="outline">
      <CardHeader>
        <Flex alignItems="center" gap="2">
          <RelayFavicon url={url} />
          <Link href={`/r/${nip19.nrelayEncode(url)}`}>
            <Heading fontSize="md" sx={{ wordBreak: "break-word" }}>
              {data?.name || url}
            </Heading>
          </Link>
        </Flex>
      </CardHeader>
      <CardBody>
        {isError ? (
          <Text color="gray.400">
            Could not fetch <Link href={`https://nips.be/11`}>NIP-11</Link>{" "}
            metadata
          </Text>
        ) : data ? (
          <RelaySummary url={url} info={data} />
        ) : null}
      </CardBody>
    </Card>
  );
}

export default function Relays() {
  const [relays] = useAtom(relaysAtom);
  return (
    <Stack spacing="4">
      {relays.map((url) => (
        <RelayCard key={url} url={url} />
      ))}
    </Stack>
  );
}