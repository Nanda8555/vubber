
const API_URL = import.meta.env.VITE_API_URL;

export const projectService = {
    async createProject(projectData: any, token: string): Promise<any> {
        try {
        const response = await fetch(`${API_URL}/projects`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(projectData),
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.error || "project creation failed");
        }

        return responseData;
        } catch (error) {
        console.error("project creation error:", error);
        throw error;
        }
    },

}