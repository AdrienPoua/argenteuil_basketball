import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Team from '@/models/Team';
import { DaysSchema } from '@/lib/validation/Team';
import categories from '@/models/Categories';
import { Button } from '@/components/ui/button';
interface WeeklyPlanningProps {
  teams: ReturnType<Team['toPlainObject']>[];
}

export function WeeklyPlanning({ teams }: Readonly<WeeklyPlanningProps>) {
  const days = DaysSchema.options;

  // Sort teams by birth year
  const sortedTeams = [...teams].sort((a, b) => {
    const yearsA = categories.getYears(a.name);
    const yearsB = categories.getYears(b.name);
    
    // Check if either team has 'Adulte' category
    const isAdulteA = yearsA.some(year => year.toLowerCase().includes('adulte') || year.toLowerCase().includes('loisirs'));
    const isAdulteB = yearsB.some(year => year.toLowerCase().includes('adulte') || year.toLowerCase().includes('loisirs'));
    
    // Adult teams go last
    if (isAdulteA && !isAdulteB) return 1;
    if (!isAdulteA && isAdulteB) return -1;
    if (isAdulteA && isAdulteB) return 0;
    
    // For numeric years, sort by the minimum year
    const minYearA = Math.min(...yearsA.map(y => parseInt(y, 10)));
    const minYearB = Math.min(...yearsB.map(y => parseInt(y, 10)));
    
    return minYearB - minYearA;
  });

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
          {sortedTeams.map((team, idx) => {
            const years = categories.getYears(team.name)
            return (
              <TableRow
                key={team.id}
                className={`hover:bg-gray-50/50 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} `}
              >
                <TableCell className='font-medium text-gray-900'>
                  {team.name} <br/> <span className='text-sm text-primary'>{years.join(', ')}</span>
                </TableCell>
                {days.map((day) => (
                  <TableCell key={day} className='p-2 text-center'>
                    <div className='flex flex-col items-center justify-center gap-1'>
                      {team.sessions
                        .filter((session) => session.day === day)
                        .map((session, index) => (
                          <Badge key={index + session.start} >
                            {session.start}-{session.end} - {session.gymnase}
                          </Badge>
                        ))}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter className='bg-primary/50'>
          <TableRow>
            <TableCell colSpan={days.length + 1} className='text-center'>
              Jean Gumier : 2 rue jean de la fontaine <br/>
              Jesse Owens : 120 rue de rochefort
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
