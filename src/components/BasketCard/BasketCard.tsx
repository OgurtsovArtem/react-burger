import { useRef, useCallback, FC } from "react";
import clsx from "clsx";
import {
  DeleteIcon,
  LockIcon,
  DragIcon,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { DELETE_ITEM, DECREASE_ITEM, CHANGE_ITEM } from "../../services/actions/ingredients";
import { useDispatch } from "react-redux";
import BasketCardStyle from "./BasketCard.module.css";
import { IIngredientsPropTypes } from "../../utils/types";
import { useDrop, useDrag, DropTargetMonitor } from "react-dnd";

// type Data = Pick<IIngredientsPropTypes, "name" | "image_mobile" | "price" | "_id" | "uniqId">;

interface IBasketCardProps {
  isLocked: boolean;
  data: IIngredientsPropTypes;
  type: "top" | "bottom" | "middle";
  index: number;
}

type exponentCallback = (
  dragId: string,
  dragIndex: number,
  hoverId: string,
  hoverIndex: number
) => void;

const BasketCard: FC<IBasketCardProps> = ({ isLocked, data, type, index }) => {
  const { name, image_mobile, price, _id, uniqId } = data;
  const dispatch = useDispatch();
  const onDelete = () => {
    dispatch({
      type: DELETE_ITEM,
      id: uniqId,
    });
    dispatch({
      type: DECREASE_ITEM,
      id: _id,
    });
  };

  const moveCard = useCallback<exponentCallback>(
    (dragId, dragIndex, hoverId, hoverIndex) => {
      dispatch({
        type: CHANGE_ITEM,
        dragId: dragId,
        hoverId: hoverId,
        dragIndex: dragIndex,
        hoverIndex: hoverIndex,
      });
    },
    [dispatch]
  );
  const ref = useRef<HTMLInputElement>(null);
  const [, drop] = useDrop({
    accept: "moveIngredients",

    hover(
      item: { index: number; uniqId: "string" },
      monitor: DropTargetMonitor<{ index: number; uniqId: "string" }>
    ) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      const dragId = item.uniqId;
      const hoverId = uniqId;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      if (!hoverBoundingRect || !clientOffset) {
        return;
      }
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCard(dragId, dragIndex, hoverId, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag, dragPreviewRef] = useDrag({
    type: "moveIngredients",
    item: () => {
      return { uniqId, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  const className = clsx(BasketCardStyle.info, {
    [BasketCardStyle.info_top]: type === "top",
    [BasketCardStyle.info_middle]: type === "middle",
    [BasketCardStyle.info_bottom]: type === "bottom",
  });

  let text = null;
  if (type === "top") {
    text = `${name} (верх)`;
  }
  if (type === "bottom") {
    text = `${name} (низ)`;
  }
  if (type === "middle") {
    text = name;
  }

  return (
    <div style={{ opacity }} className={`${BasketCardStyle.card} mb-4 mr-2`} ref={ref}>
      {type === "middle" ? (
        <button ref={drag}>
          <DragIcon type="primary" />
        </button>
      ) : null}

      <div ref={dragPreviewRef} className={`${className} pt-4 pb-4 pl-6 pr-8`}>
        <img className={BasketCardStyle.image} src={image_mobile} alt={name} />
        <p className={`${BasketCardStyle.name} text text_type_main-default`}>{text}</p>
        <div className={BasketCardStyle.price}>
          <span className={`${BasketCardStyle.value} text text_type_digits-default`}>{price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <button className={BasketCardStyle.statusButton}>
          {isLocked ? (
            <LockIcon type="primary" />
          ) : (
            <DeleteIcon type="primary" onClick={onDelete} />
          )}
        </button>
      </div>
    </div>
  );
};

export default BasketCard;
