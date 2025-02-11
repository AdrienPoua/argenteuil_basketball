import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Team from '@/models/Team';
import { DaysSchema } from '@/lib/validation/Team';

interface WeeklyPlanningProps {
  teams: ReturnType<Team['toPlainObject']>[];
}

export function WeeklyPlanning({ teams }: Readonly<WeeklyPlanningProps>) {
  const days = DaysSchema.options;

  return (
    <div className='overflow-hidden rounded-lg border bg-white'>
      <Table className='font-secondary'>
        <TableHeader>
          <TableRow className='bg-gray-50 hover:bg-gray-50'>
            <TableHead className='w-[200px] font-bold text-gray-900'>Team</TableHead>
            {days.map((day) => (
              <TableHead key={day} className='text-center font-bold text-gray-900'>
                {day}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {teams.map((team, idx) => (
            <TableRow key={team.id} className={`hover:bg-gray-50/50 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} `}>
              <TableCell className='font-medium text-gray-900'>{team.name}</TableCell>
              {days.map((day) => (
                <TableCell key={day} className='p-2 text-center'>
                  <div className='flex flex-col items-center justify-center gap-1'>
                    {team.sessions
                      .filter((session) => session.day === day)
                      .map((session, index) => (
                        <Badge key={index + session.start}>
                          {session.start}-{session.end} - {session.gymnase}
                        </Badge>
                      ))}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
