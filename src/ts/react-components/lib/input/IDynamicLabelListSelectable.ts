/**
 * Created by akersten on 10/8/17.
 */

/**
 * The DynamicLabel can have a list of objects - in order for this to work, an object needs to be able to uniquely
 * identify itself with an ID and also have a display name.
 */
export interface IDynamicLabelListSelectable {
    getName(): string;
    getId(): string;
}
