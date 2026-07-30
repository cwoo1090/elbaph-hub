![A bright trading desk where the Strait of Hormuz and a Web3 oil market appear on connected screens](/articles/meetup-3/jaehwan/01-cover-hormuz-web3-oil.png)

*It looked like a story about oil prices moving. The real opportunity appeared in the gap between traditional futures and Web3 perpetuals pricing the same oil through different time structures.*

When war breaks out, oil prices move.

That part is not new. When geopolitical tension rises in the Middle East, as in a U.S.-Iran conflict, and the risk around tankers passing through the Strait of Hormuz increases, oil prices naturally react. Actual supply may fall. Even if it does not, the market prices uncertainty first.

But the interesting part this time was not the oil price itself.

The strange event came from traditional finance and Web3 markets pricing the same underlying asset through different mechanisms. In traditional markets, there are oil futures with expiration dates. On crypto exchanges, there can be perpetual markets designed to track oil prices. Both look like instruments that give exposure to crude oil, but their internal structures are different.

And when market structures differ, prices move differently too.

This is not simply a story about oil prices going up. It is a story about how the Strait of Hormuz, the oil futures curve, oracle rollover, and funding fees created an opportunity that looked close to risk-free, and how that opportunity could become risky because of one operational detail.

## Futures and perpetuals look similar, but they move differently

Start with futures.

A futures contract is an agreement to buy or sell an asset at a specified price on a specified future date. To simplify, buying an October crude oil future means getting exposure to the price of oil for October. Because it has an expiration date, the product naturally has a time structure. May, June, July, and December contracts all exist separately, and each maturity reflects what the market expects about future conditions.

In normal times, the reason later maturities are higher or lower can be explained through storage costs, interest rates, and supply-demand expectations. But when a short-term shock appears, such as war or the risk of a maritime blockade, the curve can become much more unusual. Nearby maturities can carry a high risk premium, while later maturities may reflect the expectation that the situation will normalize by then.

That means a meaningful price gap can appear even between the May and June contracts.

Perpetuals are different. A perpetual is, as the name suggests, a futures-like product without an expiration date. In crypto markets, it is commonly used for exposure to Bitcoin or Ethereum. Because there is no maturity date, it does not settle on a specific day. Instead, when the perpetual price moves away from a reference price, long and short positions exchange funding fees so the market price is pulled back toward that reference.

The key is the reference price.

A perpetual market cannot know the real-world price by itself. It needs to refer to some oracle price. For a Bitcoin perpetual, that may be a spot price. But when a traditional-market product like oil is placed on top of Web3, the problem gets more complicated. Instead of using physical spot oil directly, the design may use a listed oil futures price from traditional markets as the reference.

Then a perpetual without expiration is using an expiring futures contract as its oracle.

That is where things become interesting.

![Oil futures price gaps shown as luminous curve lines and contract blocks](/articles/meetup-3/jaehwan/02-futures-curve.png)

*When short-term geopolitical risk rises, the gap between nearby and next-month futures can widen, and that gap becomes a reference-price problem for Web3 perpetuals.*

## The oracle eventually has to roll to the next maturity

Imagine an oil perpetual that uses the May futures contract as its oracle.

At first, there is no problem. The perpetual price can follow the May contract. But as time passes, the May contract approaches expiration. Eventually, that contract disappears. What happens then? The oracle cannot keep using the May contract forever because the market for it goes away.

So at some point, the oracle has to move to the June contract.

In normal times, this transition may not matter much. If the price difference between May and June is small, a gradual oracle rollover does not create a major shock in the perpetual price. The reference can be blended linearly or changed over a scheduled period.

But war risk changes the story.

If nearby oil futures are much more expensive and the next maturity is meaningfully cheaper, the oracle rollover itself becomes an event that implies a large price movement. In a simplified example, suppose the May contract is at 90 dollars and the June contract is at 80 dollars. When the oracle moves from May to June, the reference price falls. The perpetual price eventually has to follow that lower reference.

If market participants do not understand this, a very simple trade becomes possible.

Short the perpetual before the oracle moves down. When the oracle rolls over and the reference price falls, the perpetual price falls too, and the short position makes money. Structurally, it looks almost too easy.

The first opportunity was close to that. The market did not fully understand the oracle structure of the oil perpetual, and the funding fee barely reflected the opportunity. In other words, the information had not been fully priced in.

But once the market experiences it, it learns.

![Oracle data flow shifting from one oil futures contract cube to the next maturity](/articles/meetup-3/jaehwan/03-oracle-rollover.png)

*When an expiring futures contract becomes the reference for a non-expiring perpetual, oracle rollover stops being a minor operations event and becomes a price event.*

## When everyone shorts, long can become the better answer

The second opportunity is more interesting.

Now people know about oracle rollover. They know the reference price can fall when the oracle moves from the May contract to the June contract. So everyone thinks the same thing: "Just short the perpetual."

But perpetuals have funding fees.

If the perpetual price falls below the oracle, shorts pay funding to longs. When everyone shorts in advance, the perpetual price can move far below the oracle. The short position may still benefit from the direction of the eventual oracle drop, but it has to keep paying funding until the rollover happens.

So the answer is not simply "the oracle will go down, therefore short."

What matters is fair price. When will the oracle move? By how much? At what speed? How often is funding settled? How far below the oracle is the perpetual trading now? How much funding will shorts have to pay before the rollover? All of those pieces need to be combined before deciding whether the current price is cheap or expensive.

Think about a simple example.

Suppose the oracle is now at 100 dollars and will later move to 90 dollars. The fair price right after the rollover is obviously 90 dollars. But is the fair price right before the rollover 100 dollars? No. If you can short at 100 dollars, pay almost no funding, and then capture the price drop, the trade is too favorable. On the other hand, if the price has already moved down to 90 dollars, shorts may have to keep paying funding.

The fair price forms somewhere in between. If several funding settlements remain before the rollover, that fair price changes over time. Once you calculate this structure, there can be moments when too many people have shorted and going long on the perpetual becomes the better trade.

That is why the first event was close to a short trade, while the second event could turn into a long trade.

Even with the same oracle rollover, the right trade can reverse depending on what the market already knows.

![A digital trading floor where crowded short positioning sends funding-fee flows to the other side](/articles/meetup-3/jaehwan/04-crowded-short-funding.png)

*When everyone moves in the same direction first, the perpetual price and funding fee change. A short that looked attractive at first can become an expensive trade.*

## "Almost risk-free" breaks in front of operational details

In theory, the trade can be hedged.

You can take one position in the perpetual market and mix in the opposite exposure through traditional futures. That reduces directional oil-price risk. What remains is the mispricing created by oracle rollover and the funding-fee structure. In theory, it looks like a fairly clean arbitrage.

But real trading is not as clean as theory.

The largest issue is time. The perpetual market runs 24 hours a day. Traditional futures markets have closed hours. When a weekend is involved, there can be periods when the hedge cannot be adjusted. Whether the oracle rollover happens on Friday night or Monday morning can change the profit and loss of the entire trade.

Documentation is not always precise enough either.

Even if a document says an adjustment happens during a maintenance window, that does not automatically tell you the exact time, the market-time convention being used, or how weekends are handled. It may be information that could have been learned by asking the exchange, but if you do not ask, it may not be reflected in your price.

At this point, the phrase "almost risk-free" becomes dangerous.

A financially hedged trade can still carry operational risk. You can misunderstand the oracle schedule. The hedge leg may be closed. Liquidity may be insufficient. Sudden price movement can create liquidation risk. With leverage, small errors can become large losses.

Arbitrage is not a trade without risk. It is a trade where the risk hides somewhere other than price direction.

![An operations desk where a 24/7 crypto market and a paused traditional futures market are separated by a calendar and clock](/articles/meetup-3/jaehwan/05-operational-risk.png)

*Even a financially hedged trade has other risks when market hours, maintenance windows, weekends, and liquidity enter the picture.*

## Money comes from structural gaps, not just price gaps

What made this case interesting was not simply that oil prices rose because of war.

Traditional markets and Web3 markets were using the same word, oil, but they had different time structures and different settlement mechanisms. One sat on an expiring futures curve. The other sat on a perpetual market and funding fees. When the oracle connecting the two rolled over, the structural difference became a price difference.

Markets are mostly efficient. But when a new market, a complex product, an insufficiently explained oracle mechanism, and a geopolitical shock overlap, inefficiencies can appear briefly. They do not last long. Someone finds them, others follow, funding fees adjust, and fair price returns.

That is why opportunities like this are usually one-off events.

And the more event-like the opportunity is, the clearer the lesson becomes. You cannot only look at price. You have to look at the product structure. Where does the oracle come from? When does it change? How is funding settled? When is the hedge available?

When the Strait of Hormuz closed, oil prices moved. But the real event in the Web3 oil market was not the oil-price increase itself. It was a brief misalignment between two different market structures.

Money appeared in that gap, and risk appeared in the same gap.

![A structural gap between traditional oil futures and Web3 perpetual markets where value and warning signals appear together](/articles/meetup-3/jaehwan/06-structure-gap.png)

*A price gap is only the visible result. What matters is the structure underneath: two markets counting time differently and settling risk differently.*
