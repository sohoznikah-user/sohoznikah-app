export type BiodataStatus =
  | "draft"
  | "completed"
  | "pendingApproval"
  | "approved";

export interface CreateBiodataResponse {
  id: string;
  status: BiodataStatus;
}

export interface UpdateBiodataResponse {
  id: string;
  status: BiodataStatus;
}
