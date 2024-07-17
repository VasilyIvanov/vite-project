import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);
  
    function getErrorText(): string {
        if (error != null && typeof error === 'object') {
            if ('statusText' in error && typeof error.statusText === 'string' && error.statusText !== '')  {
                return error.statusText;
            }

            if ('message' in error && typeof error.message === 'string' && error.message !== '') {
                return error.message;
            }
        }

        return '';
    }

    return (
        <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
            <i>{getErrorText()}</i>
        </p>
        </div>
    );
}
