interface ErrorAlertProps {
  title?: string;
  message: string;
}

export function ErrorAlert({ title = "Terjadi Kesalahan", message }: ErrorAlertProps) {
  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md shadow-sm">
      <div className="flex">
        <i className="bi bi-exclamation-triangle-fill text-red-500 mr-3"></i>
        <div>
          <h3 className="text-sm font-medium text-red-800">{title}</h3>
          <p className="mt-1 text-sm text-red-700">{message}</p>
        </div>
      </div>
    </div>
  );
}