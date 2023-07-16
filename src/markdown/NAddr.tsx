import Link from "next/link";

import { Text, Code } from "@chakra-ui/react";

import { useEvent } from "@habla/nostr/hooks";
import { getMetadata } from "@habla/nip23";
import {
  LONG_FORM,
  LONG_FORM_DRAFT,
  LIVE_EVENT,
  ZAP,
  HIGHLIGHT,
  REACTION,
  BADGE,
  LISTS,
  ZAPSTR_TRACK,
  COMMUNITY,
} from "@habla/const";
import Badge from "@habla/components/nostr/Badge";
import List from "@habla/components/nostr/List";
import ZapstrTrack from "@habla/components/nostr/ZapstrTrack";
import LiveEvent from "@habla/components/nostr/LiveEvent";
import Community from "@habla/components/nostr/feed/Community";
import ArticleLink from "@habla/components/nostr/ArticleLink";

export default function Naddr({
  naddr,
  kind,
  identifier,
  pubkey,
  relays,
  ...rest
}) {
  const event = useEvent(
    {
      kinds: [kind],
      "#d": [identifier],
      authors: [pubkey],
    },
    { relays }
  );

  if (kind === LONG_FORM || kind === LONG_FORM_DRAFT) {
    const { title } = event ? getMetadata(event) : {};
    const content = (
      <Text as="span" fontWeight={500} {...rest}>
        {title}
      </Text>
    );
    return event ? <ArticleLink event={event}>{content}</ArticleLink> : content;
  }

  if (event && kind === LIVE_EVENT) {
    return <LiveEvent event={event} naddr={naddr} />;
  }

  if (event && kind === BADGE) {
    return <Badge naddr={naddr} event={event} relays={relays} />;
  }

  if (event && LISTS.includes(kind)) {
    return <List event={event} />;
  }

  if (event && kind === ZAPSTR_TRACK) {
    return <ZapstrTrack event={event} />;
  }

  if (event && kind === COMMUNITY) {
    return <Community event={event} />;
  }

  return (
    <Link href={`/a/${naddr}`} shallow>
      <Text as="span" fontWeight={500} {...rest}>
        {`${kind}:${pubkey}:${identifier}`}
      </Text>
    </Link>
  );
}
