interface IErrorPage {
  statusCode: string;
  message: string;
}

const ErrorPage = (props: IErrorPage) => {
  const { statusCode, message } = props;
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-2">
      <h1 className="text-5xl font-bold">{statusCode}</h1>
      <h2 className="text-3xl font-bold">{message}</h2>
      <a href="/" className="mt-6 text-primary hover:underline">
        <span className="text-xl font-bold">Voltar para a página inicial</span>
      </a>
    </div>
  );
};

export default ErrorPage;
