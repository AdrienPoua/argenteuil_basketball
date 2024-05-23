import { useEpg, Epg, Layout, Channel } from "planby";
import ChannelItem from "./ChannelItem";
import { v4 as uuidv4 } from "uuid";
import { TrainingType, PlanbyArrayProps } from "@/types";
import { theme } from "./theme";

const epgMaker = (data: TrainingType[]) => {
  return data.map((training: TrainingType) => {
    const start = `2000-01-01T${training.start}`;
    const end = `2000-01-01T${training.end}`;
    return {
      id: uuidv4(),
      since: start,
      till: end,
      image: "test",
      title: training.team ?? "Cours collectif",
      channelUuid: training.day,
      description: training.gym,
    };
  });
};


export default function Planning({ slots, config, channels }: Readonly<PlanbyArrayProps>) {
  const epg = epgMaker(slots);
  const { getEpgProps, getLayoutProps } = useEpg({
    epg,
    channels,
    ...config,
    theme,
  });

  const renderChannel = ({ channel } : { channel : Channel }) => <ChannelItem key={uuidv4()} channel={channel} />;
  

  return (
    <Epg {...getEpgProps()}>
      <Layout {...getLayoutProps()} renderChannel={renderChannel} />
    </Epg>
  );
}
