import React from "react";
import { ChannelBox, Channel, ProgramText } from "planby";

type ChannelItemProps = {
  channel: Channel;
};

export default function ChannelItem({ channel }: Readonly<ChannelItemProps>) {
  const { position } = channel;
  return (
    <ChannelBox {...position}>
      <ProgramText > {channel.name} </ProgramText>
    </ChannelBox>
  );
}
