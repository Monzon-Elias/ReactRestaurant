import RestaurantCard from "../RestaurantCard/RestaurantCard";
import "./withPromotedLabel.css";

const withPromotedLabel = (RestaurantCard) => {
    return props => {
        return (
            <div className="with-promoted-label">
                <label>Promoted Restaurant</label>
                <RestaurantCard {...props} />
            </div>
        );
    };
};

export default withPromotedLabel;