import { apiInstance } from "../index";

export const generalApi = apiInstance.injectEndpoints({
	endpoints: (builder) => ({
		registerUser: builder.mutation({
			query: (data) => {
				return {
					url: `form-type?nationalCode=${data.nationalCode}&phoneNumber=${data.phoneNumber}`,
					method: "GET",
				};
			},
		}),

		getSolicitedSsymptoms: builder.query({
			query: () => {
				return {
					url: `llts`,
				};
			},
		}),
	}),
});

export const { useRegisterUserMutation, useGetSolicitedSsymptomsQuery } =
	generalApi;
