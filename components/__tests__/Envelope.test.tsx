import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";

vi.mock("next/image", () => ({
  default: (props: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img src={props.src} alt={props.alt} />
  ),
}));

import Envelope from "@/components/Envelope";
import { invitation } from "@/data/invitation";

describe("Envelope", () => {
  it("shows the open prompt and hides letter content before opening", () => {
    render(<Envelope invitation={invitation} />);
    expect(screen.getByText("แตะเพื่อเปิด")).toBeInTheDocument();
    expect(screen.queryByText(invitation.invitationText)).not.toBeInTheDocument();
  });

  it("reveals the letter content after the envelope is activated", async () => {
    const user = userEvent.setup();
    render(<Envelope invitation={invitation} />);

    await user.click(screen.getByRole("button", { name: /เปิดการ์ดเชิญ/ }));

    expect(await screen.findByText(invitation.invitationText)).toBeInTheDocument();
    expect(screen.getByText("เริ่มพิธีบวช")).toBeInTheDocument();
  });
});
