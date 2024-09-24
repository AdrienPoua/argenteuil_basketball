import SDBMember from "@/lib/zod/schemas/database/MemberSchema";
import SDBClub from "@/lib/zod/schemas/database/ClubsSchema";
import SFBIMember from "@/lib/zod/schemas/FBI/MemberSchema";
import SFBIMatch from "@/lib/zod/schemas/FBI/MatchSchema";
import SDBMatch from "@/lib/zod/schemas/database/MatchSchema";
import SDBFAQ from "@/lib/zod/schemas/database/FAQSchema";
import SDBStaff from "@/lib/zod/schemas/database/StaffSchema";

// Namespace pour les schémas de base de données
export namespace SDatabase {
  export const Club = SDBClub;
  export const Member = SDBMember;
  export const Match = SDBMatch;
  export const FAQ = SDBFAQ;
  export const Staff = SDBStaff;
}

// Namespace pour les schémas issues de FBI

export namespace SFBI {
  export const Member = SFBIMember;
  export const Match = SFBIMatch;
}
