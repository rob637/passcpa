import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 safe-top safe-bottom">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-soft-lg">
            <span className="text-white font-bold text-xl">Pass</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">PassCPA</h1>
          <p className="text-slate-500 mt-1">Pass the CPA Exam with Confidence</p>
        </div>

        {/* Auth Card */}
        <div className="card-elevated p-6 sm:p-8">
          <Outlet />
        </div>

        {/* Footer */}
        <p className="text-center text-slate-400 text-sm mt-6">
          © {new Date().getFullYear()} PassCPA. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
