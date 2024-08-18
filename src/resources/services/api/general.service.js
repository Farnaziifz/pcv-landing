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
		getIntensities: builder.query({
			query: (data) => {
				return {
					url: `intensities/${data.id}`,
				};
			},
		}),
		getInterventionResult: builder.query({
			query: () => {
				return {
					url: `interventions-result`,
				};
			},
		}),
	}),
});

export const {
	useRegisterUserMutation,
	useGetSolicitedSsymptomsQuery,
	useLazyGetIntensitiesQuery,
	useGetInterventionResultQuery,
} = generalApi;
