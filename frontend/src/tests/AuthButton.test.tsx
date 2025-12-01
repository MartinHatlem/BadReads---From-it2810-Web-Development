import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthButton from "../components/AuthButton";

const mockHandleLogin = vi.fn();
const mockHandleLogout = vi.fn();

let mockAuthState: {
  currentUser: { name: string; email: string } | null;
  isLoggedIn: boolean;
  handleLogin: (email: string) => Promise<boolean>;
  handleLogout: () => void;
  loginError: string | null;
  loading: boolean;
};

vi.mock("../hooks/useAuth", () => ({
  useAuth: () => mockAuthState,
}));

beforeEach(() => {
  vi.clearAllMocks();

  mockAuthState = {
    currentUser: null,
    isLoggedIn: false,
    handleLogin: mockHandleLogin,
    handleLogout: mockHandleLogout,
    loginError: null,
    loading: false,
  };
});

describe("AuthButton tests", () => {
  describe("When logged out", () => {
    it("renders 'Log in' button text when not logged in", () => {
      render(<AuthButton />);
      expect(screen.getByText("Log in")).toBeInTheDocument();
    });

    it("opens login dialog when button is clicked", async () => {
      render(<AuthButton />);

      const button = screen.getByRole("button", { name: /log in/i });
      fireEvent.click(button);

      await waitFor(() => {
        expect(screen.getByText("Log In or Register")).toBeInTheDocument();
        expect(
          screen.getByText(
            /To write ratings, you need to log in with your email or register as a new user./i,
          ),
        ).toBeInTheDocument();
      });
    });

    it("shows email input field in login dialog", async () => {
      render(<AuthButton />);

      fireEvent.click(screen.getByRole("button", { name: /log in/i }));

      const emailInput = await screen.findByLabelText(/email/i);
      expect(emailInput).toBeInTheDocument();
    });

    it("closes dialog when cancel button is clicked", async () => {
      render(<AuthButton />);

      fireEvent.click(screen.getByRole("button", { name: /log in/i }));

      await waitFor(() => {
        expect(screen.getByText("Log In or Register")).toBeInTheDocument();
      });

      const cancelButton = screen.getByRole("button", { name: /cancel/i });
      fireEvent.click(cancelButton);

      await waitFor(() => {
        expect(
          screen.queryByText("Log In or Register"),
        ).not.toBeInTheDocument();
      });
    });
  });

  describe("Login functionality", () => {
    it("calls handleLogin with entered email and closes dialog on success", async () => {
      const user = userEvent.setup();
      mockHandleLogin.mockResolvedValue(true);

      render(<AuthButton />);

      fireEvent.click(screen.getByRole("button", { name: /log in/i }));

      const emailInput = await screen.findByLabelText(/email/i);
      await user.type(emailInput, "john@example.com");

      const submitButton = screen.getByRole("button", {
        name: /submit login/i,
      });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockHandleLogin).toHaveBeenCalledWith("john@example.com");
      });

      await waitFor(() => {
        expect(
          screen.queryByText("Log In or Register"),
        ).not.toBeInTheDocument();
      });
    });

    it("shows error message from loginError in the dialog", async () => {
      mockAuthState = {
        ...mockAuthState,
        loginError: "Email not in the register.",
      };

      render(<AuthButton />);

      fireEvent.click(screen.getByRole("button", { name: /log in/i }));

      await waitFor(() => {
        expect(
          screen.getByText("Email not in the register."),
        ).toBeInTheDocument();
      });
    });

    it("shows loading state during login", async () => {
      mockAuthState = {
        ...mockAuthState,
        loading: true,
      };

      render(<AuthButton />);

      fireEvent.click(screen.getByRole("button", { name: /log in/i }));

      const emailInput = await screen.findByLabelText(/email/i);
      expect(emailInput).toBeDisabled();

      const submitButton = screen.getByRole("button", {
        name: /submit login/i,
      });
      expect(submitButton).toBeDisabled();

      expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });
  });

  describe("When logged in", () => {
    beforeEach(() => {
      mockAuthState = {
        ...mockAuthState,
        isLoggedIn: true,
        currentUser: {
          name: "John Doe",
          email: "john@example.com",
        },
      };
    });

    it("displays user's first name when logged in", () => {
      render(<AuthButton />);
      expect(screen.getByText("John")).toBeInTheDocument();
    });

    it("shows welcome message in dialog when opened", async () => {
      render(<AuthButton />);

      fireEvent.click(screen.getByRole("button", { name: /john/i }));

      await waitFor(() => {
        expect(screen.getByText("Welcome, John Doe!")).toBeInTheDocument();
        expect(
          screen.getByText(/You are logged in as: john@example.com\./i),
        ).toBeInTheDocument();
      });
    });

    it("logs out user when logout button is clicked and closes dialog", async () => {
      render(<AuthButton />);

      fireEvent.click(screen.getByRole("button", { name: /john/i }));

      const logoutButton = await screen.findByRole("button", {
        name: /log out/i,
      });
      fireEvent.click(logoutButton);

      await waitFor(() => {
        expect(mockHandleLogout).toHaveBeenCalledTimes(1);
        expect(
          screen.queryByText("Welcome, John Doe!"),
        ).not.toBeInTheDocument();
      });
    });

    it("closes dialog when close button is clicked", async () => {
      render(<AuthButton />);

      fireEvent.click(screen.getByRole("button", { name: /john/i }));

      const closeButton = await screen.findByRole("button", {
        name: /close/i,
      });
      fireEvent.click(closeButton);

      await waitFor(() => {
        expect(
          screen.queryByText("Welcome, John Doe!"),
        ).not.toBeInTheDocument();
      });

      expect(mockHandleLogout).not.toHaveBeenCalled();
    });
  });
});
