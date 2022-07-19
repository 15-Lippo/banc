import { AdminTknData } from 'elements/admin/AdminTknData';
import { AdminUseMainnet } from 'elements/admin/AdminUseMainnet';
import { AdminUseFork } from 'elements/admin/AdminUseFork';
import { AdminControls } from 'elements/admin/AdminControls';

export const Admin = () => {
  return (
    <div className="space-y-20 text-center">
      <h1 className="pt-80">Bancor Network Configurator</h1>

      <hr />

      <AdminUseMainnet />

      <hr />

      <AdminUseFork />

      <hr />

      <AdminControls />

      <hr />

      <AdminTknData />
    </div>
  );
};
