import SDBMember from "@/lib/zod/schemas/database/MemberSchema";
import SDBClub from "@/lib/zod/schemas/database/ClubsSchema";
import SFBIMember from "@/lib/zod/schemas/FBI/MemberSchema";
import SFBIMatch from "@/lib/zod/schemas/FBI/MatchSchema";
import SDBMatch from "@/lib/zod/schemas/database/MatchSchema";
import SDBFAQ from "@/lib/zod/schemas/database/FAQSchema";
import SDBStaff from "@/lib/zod/schemas/database/StaffSchema";
import SDBLeader from "@/lib/zod/schemas/database/LeaderSchema";
import SDBCoach from "@/lib/zod/schemas/database/CoachSchema";
import SDBTeam from "@/lib/zod/schemas/database/TeamSchema";

// Namespace pour les schémas de base de données
export namespace SDatabase {
  export const Club = SDBClub;
  export const Member = SDBMember;
  export const Match = SDBMatch;
  export const FAQ = SDBFAQ;
  export const Staff = SDBStaff;
  export const Leader = SDBLeader;
  export const Coach = SDBCoach;
  export const Team = SDBTeam;
}

// Namespace pour les schémas issues de FBI

export namespace SFBI {
  export const Member = SFBIMember;
  export const Match = SFBIMatch;
}
