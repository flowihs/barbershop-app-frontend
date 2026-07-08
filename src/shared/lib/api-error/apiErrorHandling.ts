import axios  from "axios";

export function ErrorHandlingMassage(error: unknown) {

    if (axios.isAxiosError(error)) {

        if (!error.response) {
            return "Connection problem. Check your internet and try again."
        }

        const status = error.response.status;

        if (status === 404) {
            return "Profile was not found";
        }

        if (status === 400) {
            return "Telegram session could not be verified.";
        }

        if (status >= 500) {
            return "Profile service is temporarily unavailable.";
        }

        return "Could not load your profile.";
    }

    return "Something went wrong";
}