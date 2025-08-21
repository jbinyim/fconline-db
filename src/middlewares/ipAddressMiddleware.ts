import { NextFunction, Request, Response } from "express";
import requestIp from "request-ip";

/** ip6 -> ip4 로 가져오기 */
export function ipAddressMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let ipAddress = requestIp.getClientIp(req) || "";

  if (ipAddress?.startsWith("::ffff:"))
    ipAddress = ipAddress.replace("::ffff:", "");

  if (ipAddress === "::1") {
    ipAddress = "127.0.0.1";
  }

  req.clientIp = ipAddress;

  next();
}
