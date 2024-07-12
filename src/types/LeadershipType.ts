export default interface LeadershipType {
  name: string;
  number: string;
  email: string;
  teams?: string[];
  img?: string;
  isEmailDisplayed?: boolean;
  isNumberDisplayed?: boolean;
  isLeader?: boolean;
  isCoach?: boolean;
  job?: string;
}
