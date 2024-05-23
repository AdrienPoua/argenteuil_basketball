// Planning.tsx
import { useEpg, Epg, Layout } from 'planby';
import { v4 as uuidv4 } from 'uuid';
import { TrainingType, PlanbyArrayProps } from '@/types';

const epgMaker = (data: TrainingType[]) => {
  return data.map((training: TrainingType) => {
    const start = `2000-01-01T${training.start}`;
    const end = `2000-01-01T${training.end}`;
    return {
      id: uuidv4(),
      since: start,
      till: end,
      image: "test",
      title: training.team,
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
    });

    return (
        <Epg {...getEpgProps()}>
            <Layout {...getLayoutProps()} />
        </Epg>
    );
};


