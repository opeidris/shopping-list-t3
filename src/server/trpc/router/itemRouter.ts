import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const itemRouter = router({
  addItem: publicProcedure
    .input(z.object({ name: z.string()}))
    .mutation(({ input, ctx }) => {
      const {name} = input
      const item = ctx.prisma.shoppingItem.create({
        data: {
          name,
        }
      })
      return item;
    }),

  getallItems: publicProcedure
    .query(({ctx}) => {
      const items = ctx.prisma.shoppingItem.findMany()
      return items
    }),

  deleteItems: publicProcedure
    .input(z.object({id: z.string()}))
    .mutation(({input, ctx}) => {
      const {id} = input
      const item = ctx.prisma.shoppingItem.delete({
        where: {
          id,
        }
      })
      return item
    }),

  checkItem : publicProcedure
    .input(z.object({
      id: z.string(),
      checked: z.boolean()
    }))
    .mutation(({input, ctx}) => {
      const {id, checked} = input
      const item = ctx.prisma.shoppingItem.update({
        where: {
          id,
        },
        data: {
          checked,
        }
      })
      return item
    })
});
