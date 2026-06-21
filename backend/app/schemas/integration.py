from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class GitHubConnectRequest(BaseModel):
    username: str

class GitHubStatsResponse(BaseModel):
    username: str
    total_commits_this_month: int
    contribution_streak: int
    repos_count: int
    followers: int
    public_repos: List[dict] = []

class LeetCodeConnectRequest(BaseModel):
    username: str

class LeetCodeStatsResponse(BaseModel):
    username: str
    total_solved: int
    easy_solved: int
    medium_solved: int
    hard_solved: int
    acceptance_rate: float
    rank: int

class IntegrationStatus(BaseModel):
    platform: str
    connected: bool
    username: Optional[str]
    stats_updated_at: Optional[datetime]