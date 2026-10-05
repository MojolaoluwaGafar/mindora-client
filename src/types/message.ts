export type RiskLevel = "none" | "concern" | "crisis";

export type Message = {
  /** Client-side id for messages streamed in this session. */
  id?: string;
  sender: "user" | "ai";
  text: string;
  /** Set on AI replies to messages the safety check flagged. */
  risk?: RiskLevel;
};
