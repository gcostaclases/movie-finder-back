export function getUpdatedReviewStats(prevAverage, prevTotal, newRating) {
	const newTotal = prevTotal + 1;
	const newAverage = prevTotal > 0 ? (prevAverage * prevTotal + newRating) / newTotal : newRating;

	return {
		averageRating: newAverage,
		totalReviews: newTotal,
	};
}
