import { useAuthStore } from "@/store/authStore";
export default defineNuxtRouteMiddleware(async (to) => {
	const authStore = useAuthStore();
	authStore.loadPgsTokenFromCookies();
	const verified = await authStore.verifyToken();
	if (
		!["/login", "/"].includes(to.path) &&
		(!authStore.pgsToken || !verified)
	) {
		return navigateTo("/login");
	} else if (to.path === "/login" && authStore.pgsToken && verified) {
		return navigateTo("/");
	}
});
