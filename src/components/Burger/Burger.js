import React from 'react';
import classes from "./Burger.css";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";

const burger = (props) => {
    let transormedIngredients = [];
    if (props.ingredients) {
        transormedIngredients = Object.keys(props.ingredients)
            .map(igKey => {
                return [...Array(props.ingredients[igKey])].map((_, i) => {
                    return (<BurgerIngredients type={igKey} key={igKey + i}/>);
                });
            })
            .reduce((arr, el) => {
                return arr.concat(el);
            }, []);
    }
    // const transormedIngredients = [];
    // for (let igKey of Object.keys(props.ingredients)) {
    //     for (let i=0; i < props.ingredients[igKey]; i++) {
    //         transormedIngredients.push(<BurgerIngredients type={igKey} key={igKey+i}/>)
    //     }
    // }

    if (transormedIngredients.length === 0) {
        transormedIngredients = <p>Please start adding ingredients</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top"/>
            {transormedIngredients}
            <BurgerIngredients type="bread-bottom"/>
        </div>
    )
};

export default burger;