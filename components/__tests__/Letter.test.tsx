import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

// next/image needs a plain stub in jsdom.
vi.mock("next/image", () => ({
  default: (props: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img src={props.src} alt={props.alt} />
  ),
}));

import Letter from "@/components/Letter";
import { invitation } from "@/data/invitation";

describe("Letter", () => {
  it("renders the invitation text and the ordinand name", () => {
    render(<Letter invitation={invitation} />);
    expect(screen.getByText(invitation.nakName)).toBeInTheDocument();
    expect(
      screen.getByText(invitation.invitationText)
    ).toBeInTheDocument();
  });

  it("renders the photo with descriptive alt text", () => {
    render(<Letter invitation={invitation} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", invitation.photo);
    expect(img.getAttribute("alt")?.length).toBeGreaterThan(0);
  });

  it("renders all schedule events from the data", () => {
    render(<Letter invitation={invitation} />);
    expect(screen.getByText("โกนผม")).toBeInTheDocument();
    expect(screen.getByText("เริ่มพิธีบวช")).toBeInTheDocument();
  });
});
