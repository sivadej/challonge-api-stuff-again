export interface TourneyPath {
  domain: string;
  tourneyName: string;
}

export interface FormValues {
  sub: string;
  tourney: string;
}

export interface Match {
  match: MatchInfo;
}
export interface MatchInfo {
  attachment_count?: string | null;
  created_at: string;
  group_id?: string | null;
  has_attachment: boolean;
  id: number;
  identifier: string;
  location?: string | null;
  loser_id?: number | null;
  player1_id: number | null;
  player1_is_prereq_match_loser: boolean;
  player1_prereq_match_id?: number | null;
  player1_votes?: string | null;
  player2_id: number | null;
  player2_is_prereq_match_loser: boolean;
  player2_prereq_match_id?: number | null;
  player2_votes?: string | null;
  round: number;
  scheduled_time?: string | null;
  started_at?: string | null;
  state: string;
  tournament_id: number;
  underway_at?: string | null;
  updated_at: string;
  winner_id?: number | null;
  prerequisite_match_ids_csv: string;
  scores_csv: string;
}
export interface Participant {
  participant: ParticipantInfo;
}
export interface ParticipantInfo {
  active: boolean;
  checked_in_at?: string | null;
  created_at: string;
  final_rank?: string | null;
  group_id?: string | null;
  icon?: string | null;
  id: number;
  invitation_id?: string | null;
  invite_email?: string | null;
  misc?: string | null;
  name: string;
  on_waiting_list: boolean;
  seed: number;
  tournament_id: number;
  updated_at: string;
  challonge_username?: string | null;
  challonge_email_address_verified?: string | null;
  removable: boolean;
  participatable_or_invitation_attached: boolean;
  confirm_remove: boolean;
  invitation_pending: boolean;
  display_name_with_invitation_email_address: string;
  email_hash?: string | null;
  username?: string | null;
  attached_participatable_portrait_url?: string | null;
  can_check_in: boolean;
  checked_in: boolean;
  reactivatable: boolean;
}
export type PlayerMap = Map<number, ParticipantInfo>;