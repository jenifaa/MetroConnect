import { useState } from "react";
import {
  useGetAdminUsersQuery,
  useUpdateUserStatusMutation,
} from "@/redux/features/admin/admin.api";
import { useDeleteUserMutation } from "@/redux/features/auth/auth.api";
import { LoadingState, EmptyState, ErrorState } from "@/components/common/States";
import PageHeader from "@/components/common/PageHeader";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
// import { toast } from "@/components/ui/toast";
import {  Trash2, Shield, Lock, Unlock } from "lucide-react";

export default function UserManagement() {
  const { data: usersResponse, isLoading, isError, refetch } = useGetAdminUsersQuery(undefined);
  const [updateUserStatus] = useUpdateUserStatusMutation();
  const [deleteUser] = useDeleteUserMutation();

  const users = usersResponse?.data || [];

  // Dialog states
  const [userToPromote, setUserToPromote] = useState(null);
  const [userToToggleStatus, setUserToToggleStatus] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleRoleChange = async () => {
    if (!userToPromote) return;
    const targetRole = userToPromote.role === "ADMIN" ? "USER" : "ADMIN";
    try {
      await updateUserStatus({ id: userToPromote.id || userToPromote._id, role: targetRole }).unwrap();
      // toast.success(`Role updated successfully to ${targetRole}!`);
    } catch (err) {
      // toast.error(err?.data?.message || "Failed to update role");
      console.log(err);
    } finally {
      setUserToPromote(null);
    }
  };

  const handleStatusToggle = async () => {
    if (!userToToggleStatus) return;
    const targetStatus = userToToggleStatus.status === "suspended" ? "active" : "suspended";
    try {
      await updateUserStatus({ id: userToToggleStatus.id || userToToggleStatus._id, status: targetStatus }).unwrap();
      // toast.success(`User status updated to ${targetStatus}!`);
    } catch (err) {
      // toast.error(err?.data?.message || "Failed to toggle status");
      console.log(err);
    } finally {
      setUserToToggleStatus(null);
    }
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    try {
      await deleteUser(userToDelete).unwrap();
      // toast.success("User account deleted permanently");
    } catch (err) {
      // toast.error(err?.data?.message || "Could not delete account");
      console.log(err);
    } finally {
      setUserToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="User Management"
        description="View registered accounts, assign administrative roles, or suspend user access keys."
      />

      {isLoading ? (
        <LoadingState message="Fetching registered accounts..." items={3} />
      ) : isError ? (
        <ErrorState onRetry={refetch} />
      ) : users.length === 0 ? (
        <EmptyState title="No registered users" description="No student profiles are registered on this database." />
      ) : (
        <Card className="border border-muted rounded-3xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-muted/40 border-b border-muted">
                  <th className="px-6 py-4 font-bold text-foreground">User</th>
                  <th className="px-6 py-4 font-bold text-foreground">Email</th>
                  <th className="px-6 py-4 font-bold text-foreground">Role</th>
                  <th className="px-6 py-4 font-bold text-foreground">Status</th>
                  <th className="px-6 py-4 font-bold text-foreground text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-muted/60">
                {users.map((account) => (
                  <tr key={account.id || account._id} className="hover:bg-muted/10 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={account.picture || "https://i.ibb.co.com/xttK0CDW/pp.jpg"}
                          alt="Avatar"
                          className="h-9 w-9 rounded-full object-cover border"
                        />
                        <div>
                          <p className="font-semibold text-foreground">{account.name}</p>
                          <p className="text-[10px] text-muted-foreground font-mono">
                            ID: {account.studentId || "2026-MU-102"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground font-mono text-xs">{account.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${account.role === "ADMIN" || account.role === "SUPER_ADMIN"
                          ? "bg-purple-500/10 text-purple-700 dark:text-purple-400"
                          : "bg-blue-500/10 text-blue-700 dark:text-blue-400"
                        }`}>
                        {account.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${account.status === "suspended"
                          ? "bg-red-500/10 text-red-700 dark:text-red-400"
                          : "bg-green-500/10 text-green-700 dark:text-green-400"
                        }`}>
                        {account.status || "active"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Promote/Demote */}
                        <Button
                          onClick={() => setUserToPromote(account)}
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-lg text-purple-500 hover:bg-purple-500/10"
                          title={account.role === "ADMIN" ? "Demote to User" : "Promote to Admin"}
                        >
                          <Shield className="h-4 w-4" />
                        </Button>

                        {/* Lock/Unlock Toggle */}
                        <Button
                          onClick={() => setUserToToggleStatus(account)}
                          variant="ghost"
                          size="icon"
                          className={`h-8 w-8 rounded-lg ${account.status === "suspended"
                              ? "text-green-600 hover:bg-green-500/10"
                              : "text-amber-600 hover:bg-amber-500/10"
                            }`}
                          title={account.status === "suspended" ? "Unsuspend account" : "Suspend account"}
                        >
                          {account.status === "suspended" ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                        </Button>

                        {/* Delete account */}
                        <Button
                          onClick={() => setUserToDelete(account.id || account._id)}
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-lg text-red-500 hover:bg-red-500/10"
                          title="Delete account permanently"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Promotion Confirm */}
      <ConfirmDialog
        isOpen={!!userToPromote}
        title="Update User Authorization Role"
        description={`Confirm changes to update authorization level for ${userToPromote?.name} to ${userToPromote?.role === "ADMIN" ? "USER (student)" : "ADMIN"
          }.`}
        confirmText="Confirm change"
        isDanger={false}
        onConfirm={handleRoleChange}
        onClose={() => setUserToPromote(null)}
      />

      {/* Lock/Unlock Confirm */}
      <ConfirmDialog
        isOpen={!!userToToggleStatus}
        title={userToToggleStatus?.status === "suspended" ? "Unsuspend account" : "Suspend account"}
        description={`Are you sure you want to ${userToToggleStatus?.status === "suspended" ? "unsuspend" : "suspend"
          } access keys for ${userToToggleStatus?.name}?`}
        confirmText={userToToggleStatus?.status === "suspended" ? "Unsuspend" : "Suspend"}
        onConfirm={handleStatusToggle}
        onClose={() => setUserToToggleStatus(null)}
      />

      {/* Delete User Confirm */}
      <ConfirmDialog
        isOpen={!!userToDelete}
        title="Delete account permanently"
        description="Are you absolutely sure you want to delete this profile? This deletes all files, comments, and logins from the system. This cannot be undone."
        onConfirm={handleDeleteUser}
        onClose={() => setUserToDelete(null)}
      />
    </div>
  );
}
