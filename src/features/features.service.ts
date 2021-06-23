import { Injectable } from "@nestjs/common";

@Injectable()
export class FeaturesService {
  healthCheck(): string {
    return "Features: Alive";
  }
}
