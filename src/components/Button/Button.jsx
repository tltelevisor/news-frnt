import classes from './Button.module.css'

export default function Button({ children, isActive, ...props1 }) {
  return (
      <button
        {...props1}
        className={
          isActive ? `${classes.button} ${classes.active}` : classes.button
        } 
      >
        {children}
      </button>

 

  )
}
